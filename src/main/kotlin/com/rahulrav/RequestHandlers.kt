package com.rahulrav

import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Routing.main() {
  get("/") {
    context.respond("Server up.")
  }

  static("files") {
    resources("files")
  }

  static("blog") {
    resources("blog/html")
    defaultResource("blog/html/toc.html")
  }

  static("assets") {
    resources("blog/assets")
  }

}
