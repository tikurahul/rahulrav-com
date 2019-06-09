package com.rahulrav

import io.ktor.http.content.resources
import io.ktor.http.content.static
import io.ktor.response.respond
import io.ktor.routing.Routing
import io.ktor.routing.get

fun Routing.main() {
  get("/") {
    context.respond("Server up.")
  }

  static(".well-known") {
    resources("files/well-known")
  }

  static("blog") {
    resources("blog/html")
  }

  static("assets") {
    resources("blog/assets")
  }

}
