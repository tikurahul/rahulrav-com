package com.rahulrav

import com.google.appengine.api.memcache.ErrorHandlers
import com.google.appengine.api.memcache.MemcacheService
import com.google.appengine.api.memcache.MemcacheServiceFactory
import com.google.gson.Gson
import io.ktor.application.Application
import io.ktor.application.call
import io.ktor.application.install
import io.ktor.application.log
import io.ktor.features.AutoHeadResponse
import io.ktor.features.CORS
import io.ktor.features.ContentNegotiation
import io.ktor.features.StatusPages
import io.ktor.gson.gson
import io.ktor.http.HttpHeaders
import io.ktor.http.HttpMethod
import io.ktor.http.HttpStatusCode
import io.ktor.response.respond
import io.ktor.routing.routing
import org.slf4j.LoggerFactory
import java.util.logging.Level

object AppContext {
  private const val NAME = "rahulrav.com"

  val gson = lazy { Gson() }

  val logger = lazy {
    LoggerFactory.getLogger(NAME)
  }

  val cache: Lazy<MemcacheService> = lazy {
    val cache = MemcacheServiceFactory.getMemcacheService()
    cache.errorHandler = ErrorHandlers.getConsistentLogAndContinue(Level.INFO)
    cache
  }
}

fun Application.main() {
  install(StatusPages) {
    exception<Throwable> { cause ->
      call.application.log.error("Something bad happened", cause)
      call.respond(HttpStatusCode.InternalServerError, "Something bad happened ${cause.message}")
    }
  }

  install(CORS) {
    anyHost()
    // For Static Content
    install(AutoHeadResponse)

    // allow Authorization headers and Range Headers for CORS
    header(HttpHeaders.Authorization)
    header(HttpHeaders.Range)

    // allow Options methods for pre-flight requests.
    method(HttpMethod.Options)
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
