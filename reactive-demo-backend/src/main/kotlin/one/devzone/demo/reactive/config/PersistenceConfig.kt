package one.devzone.demo.reactive.config

import one.devzone.demo.reactive.data.AirlineRepository
import one.devzone.demo.reactive.model.Airline
import org.springframework.boot.persistence.autoconfigure.EntityScan
import org.springframework.context.annotation.Configuration
import org.springframework.data.jpa.repository.config.EnableJpaRepositories

@Configuration
@EnableJpaRepositories(basePackageClasses = [AirlineRepository::class])
@EntityScan(basePackageClasses = [Airline::class])
class PersistenceConfig