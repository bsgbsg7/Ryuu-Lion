package redlib.backend.config;

import io.swagger.v3.oas.models.OpenAPI;
import org.springdoc.core.customizers.OpenApiCustomizer;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig implements OpenApiCustomizer {
    @Override
    public void customise(OpenAPI openApi) {
        openApi.getPaths()
                .forEach((s, pathItem) ->
                        pathItem.readOperations()
                                .forEach(operation ->
                                        operation.setTags(operation.getTags()
                                                .stream()
                                                .map(t -> t.replace("-controller", ""))
                                                .toList())));
    }
}
