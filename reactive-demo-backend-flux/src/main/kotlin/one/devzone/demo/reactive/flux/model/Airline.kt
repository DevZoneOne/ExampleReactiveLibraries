package one.devzone.demo.reactive.flux.model

import org.springframework.data.annotation.Id
import org.springframework.data.annotation.Transient
import org.springframework.data.domain.Persistable
import org.springframework.data.relational.core.mapping.Column
import org.springframework.data.relational.core.mapping.Table

@Table(name = "AIRLINE")
class Airline(
    @Id
    @Column("ID")
    var airlineId: Int? = null,

    @Column("NAME")
    var name: String? = null,

    @Column("ALIAS")
    var alias: String? = null,

    @Column("IATA")
    var iata: String? = null,

    @Column("ICAO")
    var icao: String? = null,

    @Column("CALLSIGN")
    var callsign: String? = null,

    @Column("COUNTRY")
    var country: String? = null,

    @Column("ACTIVE")
    var active: String? = null,

    @Column("FAVORITE")
    var favorite: Boolean = false
) : Persistable<Int> {

    @Transient
    var newRecord: Boolean = true

    override fun getId(): Int? = airlineId

    override fun isNew(): Boolean = newRecord
}