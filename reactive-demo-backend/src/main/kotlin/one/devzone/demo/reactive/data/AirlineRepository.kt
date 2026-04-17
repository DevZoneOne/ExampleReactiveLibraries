package one.devzone.demo.reactive.data

import one.devzone.demo.reactive.model.Airline
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.CrudRepository

interface AirlineRepository : CrudRepository<Airline, Int> {
    fun findAirlineByCountry(country: String): List<Airline>

    @Query("SELECT DISTINCT a.country FROM Airline a ORDER BY a.country")
    fun findDistinctCountries(): List<String>

}
