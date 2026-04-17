package one.devzone.demo.reactive.flux.web

import one.devzone.demo.reactive.flux.data.AirlineRepository
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = ["/api/airline"], produces = ["application/json"])
class AirlineController(private val repository: AirlineRepository) {


    @GetMapping("/countries")
    fun getCountries() = repository.findDistinctCountries().collectList()

    @GetMapping("/{country}")
    fun getForCountry(
        @PathVariable country: String
    ) = repository.findAirlineByCountry(country)

    @PutMapping("/{id}/favorite")
    fun setFavorite(
        @PathVariable id: Int,
        @RequestBody favorite: Boolean
    ) = repository.findById(id).flatMap {
        it.favorite = favorite
        it.newRecord = false
        repository.save(it)
    }

    @GetMapping
    fun index() = repository.findAirlineByCountry("Netherlands")

}