package com.rahulrav

import io.ktor.server.http.content.*
import io.ktor.server.response.*
import io.ktor.server.routing.*

fun Routing.main() {
    get("/") {
        // Redirect to the blog.
        call.respondRedirect("/blog")
    }

    staticResources("/files", "files")
    staticResources("/blog", "blog/html", index = "toc.html")
    staticResources("/assets", "blog/assets")
}
