package one.devzone.demo.reactive.web

import one.devzone.demo.reactive.data.AirlineRepository
import org.springframework.data.repository.findByIdOrNull
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
    fun getCountries() = repository.findDistinctCountries()

    @GetMapping("/{country}")
    fun getForCountry(
            @PathVariable country: String
    ) = repository.findAirlineByCountry(country)

    @PutMapping("/{id}/favorite")
    fun setFavorite(
            @PathVariable id: Int,
            @RequestBody favorite: Boolean
    ) = repository.findByIdOrNull(id)?.let {
        it.favorite = favorite
        repository.save(it)
        it
    }

    @GetMapping
    fun index() = repository.findAirlineByCountry("Netherlands")
}