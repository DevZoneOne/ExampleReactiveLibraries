package one.devzone.demo.reactive.model

import jakarta.persistence.Column
import jakarta.persistence.Entity
import jakarta.persistence.Id
import jakarta.persistence.Table

@Entity
@Table(name = "AIRLINE")
class Airline(
    @Id
    @Column(name = "ID")
    var id: Int? = null,

    @Column(name = "NAME")
    var name: String? = null,

    @Column(name = "ALIAS")
    var alias: String? = null,

    @Column(name = "IATA", length = 2)
    var iata: String? = null,

    @Column(name = "ICAO", length = 3)
    var icao: String? = null,

    @Column(name = "CALLSIGN")
    var callsign: String? = null,

    @Column(name = "COUNTRY")
    var country: String? = null,

    @Column(name = "ACTIVE", length = 1)
    var active: String? = null,

    @Column(name = "FAVORITE")
    var favorite: Boolean = false
)