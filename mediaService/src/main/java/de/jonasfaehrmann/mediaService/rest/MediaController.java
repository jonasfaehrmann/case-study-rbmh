package de.jonasfaehrmann.mediaService.rest;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import de.jonasfaehrmann.mediaService.entity.Media;
import de.jonasfaehrmann.mediaService.repository.MediaRepository;

@Controller
@RequestMapping(path="/media")
public class MediaController {
  @Autowired
  private MediaRepository mediaRepository;

  @PostMapping(path="/updateRating")
  public @ResponseBody String modifyMedia (@RequestParam String id
      , @RequestParam int rating) { 
    Optional<Media> optionalEntity = mediaRepository.findById(id);
    if (optionalEntity.isPresent()) {
    	Media entity = optionalEntity.get();
    	entity.setRating(rating);
        mediaRepository.save(entity);
        return "Saved";
    } else {
    	return "Entity doesnt exist";
    }
  }

  @GetMapping(path="/")
  public @ResponseBody Iterable<Media> getAllMedia() {
    return mediaRepository.findAll();
  }
}