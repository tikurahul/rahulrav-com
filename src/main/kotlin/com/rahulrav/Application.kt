package com.rahulrav

import com.google.appengine.api.memcache.ErrorHandlers
import com.google.appengine.api.memcache.MemcacheService
import com.google.appengine.api.memcache.MemcacheServiceFactory
import io.ktor.http.*
import io.ktor.http.content.*
import io.ktor.serialization.gson.*
import io.ktor.server.application.*
import io.ktor.server.plugins.autohead.*
import io.ktor.server.plugins.cachingheaders.*
import io.ktor.server.plugins.calllogging.*
import io.ktor.server.plugins.compression.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*
import io.ktor.server.plugins.statuspages.*
import io.ktor.server.response.*
import io.ktor.server.routing.*
import org.slf4j.LoggerFactory
import org.slf4j.event.Level
import java.time.Duration

object AppContext {
    private const val NAME = "rahulrav.com"
    val logger = lazy {
        LoggerFactory.getLogger(NAME)
    }

    val cache: Lazy<MemcacheService> = lazy {
        val cache = MemcacheServiceFactory.getMemcacheService()
        cache.errorHandler = ErrorHandlers.getConsistentLogAndContinue(java.util.logging.Level.INFO)
        cache
    }
}

fun Application.main() {
    install(Compression) {
        gzip()
        deflate()
    }
    install(CallLogging) {
        level = Level.INFO
    }

    install(StatusPages) {
        exception<Throwable> { call, cause ->
            call.application.log.error("Something bad happened", cause)
            call.respond(HttpStatusCode.InternalServerError, "Something bad happened ${cause.message}")
        }
    }
    install(CachingHeaders) {
        val defaultCacheControl =
            CachingOptions(CacheControl.MaxAge(maxAgeSeconds = Duration.ofDays(1).seconds.toInt()))
        options { _, content ->
            when (content.contentType?.withoutParameters()) {
                ContentType.Image.PNG, ContentType.Image.JPEG, ContentType.Text.CSS -> defaultCacheControl
                else -> null
            }
        }
    }
    install(AutoHeadResponse)
    install(CORS) {
        allowMethod(HttpMethod.Options)
        allowHeader(HttpHeaders.Authorization)
        allowHeader(HttpHeaders.Range)
    }
    install(ContentNegotiation) {
        gson {
            setPrettyPrinting()
        }
    }

    routing {
        main()
    }
}
