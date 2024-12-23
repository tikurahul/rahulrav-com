package com.rahulrav

import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Routing.main() {
    get("/") {
        call.respond("Server up.")
    }

    staticResources("/files", "base")
    staticResources("/blog", "blog/html", index = "toc.html")
    staticResources("/assets", "blog/assets")
}
