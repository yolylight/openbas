package io.openbas.database.repository;

import io.openbas.database.model.LessonsTemplateCategory;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import jakarta.validation.constraints.NotNull;
import java.util.Optional;

@Repository
public interface LessonsTemplateCategoryRepository extends CrudRepository<LessonsTemplateCategory, String>, JpaSpecificationExecutor<LessonsTemplateCategory> {

    @NotNull
    Optional<LessonsTemplateCategory> findById(@NotNull String id);
}