package com.example.be.controller;

import com.example.be.model.Images;
import com.example.be.service.IImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/images")
public class ImagesRestController {
    @Autowired
    private IImagesService imagesService;

    @GetMapping("/{id}")
    public ResponseEntity<List<Images>> getImages(@PathVariable("id")Integer id){
        try {
            return new ResponseEntity<>(imagesService.getImage(id), HttpStatus.OK);
        }catch (Exception e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

}
