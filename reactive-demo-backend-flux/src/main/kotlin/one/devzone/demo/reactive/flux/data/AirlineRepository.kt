package one.devzone.demo.reactive.flux.data

import one.devzone.demo.reactive.flux.model.Airline
import org.springframework.data.r2dbc.repository.Query
import org.springframework.data.repository.reactive.ReactiveCrudRepository
import reactor.core.publisher.Flux

interface AirlineRepository : ReactiveCrudRepository<Airline, Int> {

    fun findAirlineByCountry(country: String): Flux<Airline>

    @Query("SELECT DISTINCT a.country FROM Airline a ORDER BY a.country")
    fun findDistinctCountries(): Flux<String>

}
