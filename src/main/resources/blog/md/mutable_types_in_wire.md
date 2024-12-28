Dec 27 2024, Friday

## Mutable Types in Wire

Block's [Wire](https://github.com/square/wire) is a protocol buffer compiler and implementation that is Kotlin Multiplatform ready.
To understand the motivations around why Block (Square at the time) built Wire, their [blog post](https://developer.squareup.com/blog/introducing-wire-protocol-buffers/) announcing the release of Wire `1.0` is a great read.

One of the reasons Wire has been successful is because they paid a lot of attention to the ergonomics of generated code. Here is an excerpt from their [blog post](https://developer.squareup.com/blog/introducing-wire-protocol-buffers/#wire-features) (emphasis mine).

> * Messages should be clean, developer-friendly data objects:
* They should be highly readable
* They should be **deeply immutable**

### On Immutability

Immutability is an excellent trait to have for Messages. Here is a wonderful [blog post by Roman Elizarov](https://elizarov.medium.com/immutability-we-can-afford-10c0dcb8351d) (was Kotlin's language lead) on designing immutable abstractions that we can afford.

#### Immutability's trade-offs

One of the main trade-offs Immutability makes is the following:

* Potential Memory Overhead
  Immutable types are by definition not-modifiable. Therefore, anytime you want to make a change; you end up having to re-create objects given the inability to modify existing ones. This adds to GC pressure. For performance sensitive code, this is not ideal.

* Performance Impact for frequent Updates
  If your application involves very frequent updates to large data structures, the overhead of creating new objects can quickly become noticeable.

### Mutable Types

I [recently](https://github.com/square/wire/commit/54e032b1dd520fefdfce4799fda8470c4a97f1c3) contributed a change to Wire to allow marking a `Message` as mutable. 
For extremely performance sensitive code, you too might find this option useful. 

I highly recommend using these types with care. These types should **always be behind an abstraction** that hides the fact that the underlying type is mutable. This is because you lose all the nice properties of immutable `Message` types.

#### Learnings

I really enjoyed the discussion with Wire's maintainer's [Jesse Wilson](https://publicobject.com), [Jake Wharton](https://jakewharton.com) and [Benoît Quenaudon](https://quenaudon.com). One interesting potential solution that we explored for the codegen was something Jesse called a `decomposed` `encode(...)`.

Let's look at an example:

```protobuf
syntax = "proto2";

package squareup.wire.mutable;

message Header {
  optional uint64 id = 1;
  optional string name = 2;
}

message Payload {
  optional bytes content = 1;
}

message Packet {
  optional Header header = 1;
  optional Payload payload = 2;
}
```

The generated code for the message `Packet` looks something like (prior to my changes):

```kotlin
public class Packet(
  @field:WireField(
    tag = 1,
    adapter = "squareup.wire.mutable.Header#ADAPTER",
    declaredName = "header",
    schemaIndex = 0,
  )
  public val header_: Header? = null,
  @field:WireField(
    tag = 2,
    adapter = "squareup.wire.mutable.Payload#ADAPTER",
    schemaIndex = 1,
  )
  public val payload: Payload? = null,
  override val unknownFields: ByteString = ByteString.EMPTY,
) : Message<Packet, Nothing>(ADAPTER, unknownFields) {
  public companion object {
    @JvmField
    public val ADAPTER: ProtoAdapter<Packet> = object : ProtoAdapter<Packet>(
      FieldEncoding.LENGTH_DELIMITED, 
      Packet::class, 
      "type.googleapis.com/squareup.wire.mutable.Packet", 
      PROTO_2, 
      null, 
      "squareup/wire/mutable_types.proto"
    ) {
      // ...
      override fun encode(writer: ProtoWriter, `value`: Packet) {
        Header.ADAPTER.encodeWithTag(writer, 1, value.header_)
        Payload.ADAPTER.encodeWithTag(writer, 2, value.payload)
        writer.writeBytes(value.unknownFields)
      }
      override fun encode(writer: ReverseProtoWriter, `value`: Packet) {
        // ...
      }
      override fun decode(reader: ProtoReader): Packet {
        // ...
      }
      override fun redact(`value`: Packet): Packet = {
        // ...
      }
    }
    private const val serialVersionUID: Long = 0L
  }
}
```

In particular, pay special attention to the the implementation of `encode(...)` in `Packet.ADAPTER`.

If all we needed was a more efficient way of encoding a `Packet` without needing to create instances of the underlying type; then we could generate an overloaded `encode(...)` which had the following type signature:

```kotlin
public companion object {
  @JvmField
  public val ADAPTER: ProtoAdapter<Packet> = object : ProtoAdapter<Packet>(
    FieldEncoding.LENGTH_DELIMITED, 
    Packet::class, 
    "type.googleapis.com/squareup.wire.mutable.Packet", 
    PROTO_2, 
    null, 
    "squareup/wire/mutable_types.proto"
  ) {
    // ...
    
    /*
     * Notice that the `Packet` type got decomposed to its constituent
     * `Header` and `Payload` nested messages, which finally got
     * decomposed to their respective types.
     * 
     * We could essentially decompose every single `Message` type
     * until they only referred to the base types supported by Protocol Buffers.
     */
    override fun encode(
      writer: ProtoWriter,
      header_id: Long, // id from `Header
      header_name: String, // name from `Header`
      payload_content: ByteString, // content from `Payload`
    ) {
      // ...
    }
  }
}
```

In the above example, we essentially decomposed the `Packet` message to its constituent components `Header` and `Payload` which we then recursively decomposed to `id`, `name` and `content` respectively.

We would essentially decompose every single `Message` type until they only referred to the base types supported by Protocol Buffers. This would mean that the underlying type could **still be immutable !**.

The reason why we did not end up doing this was because, the numbers of parameters in the generated `encode` method would be excessively large for complex `Message` types. The API would also get confusing when you had overlapping types; For e.g.

```protobuf
message Packet {
  optional Header header_1 = 1;
  optional Header header_2 = 2;
  optional Payload payload = 3;
}
```

would generate an encode that would have

```kotlin
public companion object {
  @JvmField
  public val ADAPTER: ProtoAdapter<Packet> = object : ProtoAdapter<Packet>(
    FieldEncoding.LENGTH_DELIMITED, 
    Packet::class, 
    "type.googleapis.com/squareup.wire.mutable.Packet", 
    PROTO_2, 
    null, 
    "squareup/wire/mutable_types.proto"
  ) {
    // ...
    override fun encode(
      writer: ProtoWriter,
      header_1_id: Long, // id from `Header`
      header_1_name: String, // name from `Header`
      header_2_id: Long, // id from `Header
      header_2_name: String, // name from `Header`
      payload_content: ByteString, // content from `Payload`
    ) {
      // ...
    }
  }
}
```

The parameter names `header_1_id`, and `header_2_id` etc. start to get overwhelming and it makes it easy to make mistakes. 

Instead, we picked:

```kotlin
// Code generated by Wire protocol buffer compiler, do not edit.
// Source: squareup.wire.mutable.Packet in squareup/wire/mutable_types.proto
public class MutablePacket(
  @field:WireField(
    tag = 1,
    adapter = "squareup.wire.mutable.MutableHeader#ADAPTER",
    declaredName = "header",
    schemaIndex = 0,
  )
  public var header_: MutableHeader? = null,
  @field:WireField(
    tag = 2,
    adapter = "squareup.wire.mutable.MutablePayload#ADAPTER",
    schemaIndex = 1,
  )
  public var payload: MutablePayload? = null,
  override var unknownFields: ByteString = ByteString.EMPTY,
) : Message<MutablePacket, Nothing>(ADAPTER, unknownFields) {
  // ...
  public companion object {
    @JvmField
    public val ADAPTER: ProtoAdapter<MutablePacket> = object : ProtoAdapter<MutablePacket>(
      FieldEncoding.LENGTH_DELIMITED, 
      MutablePacket::class, 
      "type.googleapis.com/squareup.wire.mutable.Packet", 
      PROTO_2, 
      null, 
      "squareup/wire/mutable_types.proto"
    ) {
      // ...
      override fun encode(writer: ProtoWriter, `value`: MutablePacket) {
        MutableHeader.ADAPTER.encodeWithTag(writer, 1, value.header_)
        MutablePayload.ADAPTER.encodeWithTag(writer, 2, value.payload)
        writer.writeBytes(value.unknownFields)
      }
      override fun decode(reader: ProtoReader): MutablePacket {
        var header_: MutableHeader? = null
        var payload: MutablePayload? = null
        val unknownFields = reader.forEachTag { tag ->
          when (tag) {
            1 -> header_ = MutableHeader.ADAPTER.decode(reader)
            2 -> payload = MutablePayload.ADAPTER.decode(reader)
            else -> reader.readUnknownField(tag)
          }
        }
        return MutablePacket(
          header_ = header_,
          payload = payload,
          unknownFields = unknownFields
        )
      }
      // ...
    }
    private const val serialVersionUID: Long = 0L
  }
}
```

We generate types prefixed with the word `Mutable`, and all the corresponding fields are declared as `public var`. This allows us to express our intent a lot more naturally with the caveat that the type is **fully mutable** and **unsafe by default**.

### Epilogue

I really had a lot of fun implementing this feature. This was my first real foray into code generation and working with the Wire code base was a joy. Special thanks to [Jesse Wilson](https://publicobject.com), [Jake Wharton](https://jakewharton.com) and [Benoît Quenaudon](https://quenaudon.com) for their patience, help and support.
