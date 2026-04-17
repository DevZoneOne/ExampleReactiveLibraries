@file:Suppress("SpellCheckingInspection")

package one.devzone.demo.reactive.flux.setup

import com.fasterxml.jackson.databind.MappingIterator
import com.fasterxml.jackson.dataformat.csv.CsvMapper
import com.fasterxml.jackson.dataformat.csv.CsvSchema
import one.devzone.demo.reactive.flux.data.AirlineRepository
import one.devzone.demo.reactive.flux.model.Airline
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component
import java.time.Duration

@Component
class Setup(private val repository: AirlineRepository) : CommandLineRunner {

    override fun run(vararg args: String) {

        val bootstrapSchema = CsvSchema.builder()
            .addColumn("airlineId", CsvSchema.ColumnType.NUMBER)
            .addColumn("name", CsvSchema.ColumnType.STRING)
            .addColumn("alias", CsvSchema.ColumnType.STRING)
            .addColumn("iata", CsvSchema.ColumnType.STRING)
            .addColumn("icao", CsvSchema.ColumnType.STRING)
            .addColumn("callsign", CsvSchema.ColumnType.STRING)
            .addColumn("country", CsvSchema.ColumnType.STRING)
            .addColumn("active", CsvSchema.ColumnType.STRING)
            .build()
            .withoutHeader()

        var collection = emptyList<Airline>()

        this.javaClass.classLoader.getResourceAsStream("airlines.dat")?.use { stream ->
            stream.reader().use { reader ->
                val readValues: MappingIterator<Airline> = CsvMapper()
                    .readerFor(Airline::class.java)
                    .with(bootstrapSchema)
                    .readValues(reader)

                collection = readValues.asSequence()
                    .filter { it.id!! >= 2 }
                    .filter { it.active == "Y" }
                    .filter { it.country?.length in 4..<14 && it.country?.trim() != "S.A." }
                    .map {
                        it.country = it.country?.trim()
                        it.iata = it.iata?.trim('\\', '\'')
                        it.icao = it.icao?.trim('\\', '\'')
                        it
                    }
                    .toList()

            }
        }

        repository.saveAll(collection).blockLast(Duration.ofSeconds(10))
    }
}