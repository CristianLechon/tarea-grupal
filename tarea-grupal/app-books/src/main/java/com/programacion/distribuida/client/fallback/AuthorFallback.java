package com.programacion.distribuida.client.fallback;

import com.programacion.distribuida.dtos.AuthorDto;
import org.eclipse.microprofile.faulttolerance.ExecutionContext;
import org.eclipse.microprofile.faulttolerance.FallbackHandler;

import java.util.List;

public class AuthorFallback implements FallbackHandler<List<AuthorDto>> {
    @Override
    public List<AuthorDto> handle(ExecutionContext context) {
        System.out.println("FALLBACK ACTIVADO: No se pudo contactar con app-authors.");
        return List.of(new AuthorDto(-1, "Autores temporalmente no disponibles"));
    }
}