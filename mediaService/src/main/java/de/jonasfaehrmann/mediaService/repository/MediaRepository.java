package de.jonasfaehrmann.mediaService.repository;

import org.springframework.stereotype.Repository;

import de.jonasfaehrmann.mediaService.entity.Media;

import org.springframework.data.repository.CrudRepository;

@Repository
public interface MediaRepository extends CrudRepository<Media, String>{

	Iterable<Media> findTop10ByOrderByRatingDesc();
}