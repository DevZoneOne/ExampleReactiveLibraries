@file:Suppress("SpellCheckingInspection")

package one.devzone.demo.reactive.setup

import com.fasterxml.jackson.databind.MappingIterator
import com.fasterxml.jackson.dataformat.csv.CsvMapper
import com.fasterxml.jackson.dataformat.csv.CsvSchema
import one.devzone.demo.reactive.data.AirlineRepository
import one.devzone.demo.reactive.model.Airline
import org.springframework.boot.CommandLineRunner
import org.springframework.stereotype.Component

@Component
class Setup(private val repository: AirlineRepository) : CommandLineRunner {

    override fun run(vararg args: String) {
        val bootstrapSchema = CsvSchema.builder()
            .addColumn("id", CsvSchema.ColumnType.NUMBER)
            .addColumn("name", CsvSchema.ColumnType.STRING)
            .addColumn("alias", CsvSchema.ColumnType.STRING)
            .addColumn("iata", CsvSchema.ColumnType.STRING)
            .addColumn("icao", CsvSchema.ColumnType.STRING)
            .addColumn("callsign", CsvSchema.ColumnType.STRING)
            .addColumn("country", CsvSchema.ColumnType.STRING)
            .addColumn("active", CsvSchema.ColumnType.STRING)
            .build()
            .withoutHeader()

        this::class.java.classLoader.getResourceAsStream("airlines.dat")?.use { stream ->
            stream.reader().use { reader ->
                val readValues: MappingIterator<Airline> = CsvMapper()
                    .readerFor(Airline::class.java)
                    .with(bootstrapSchema)
                    .readValues(reader)

                readValues.asSequence()
                    .filter { it.id!! >= 2 }
                    .filter { it.active == "Y" }
                    .filter { it.country?.length in 4..<14 && it.country?.trim() != "S.A." }
                    .forEach {
                        it.country = it.country?.trim()
                        it.iata = it.iata?.trim('\\', '\'')
                        it.icao = it.icao?.trim('\\', '\'')
                        repository.save(it)
                    }
            }
        }
    }

}