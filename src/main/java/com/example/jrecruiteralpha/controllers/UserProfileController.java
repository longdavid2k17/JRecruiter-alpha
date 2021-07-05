package com.example.jrecruiteralpha.controllers;

import com.example.jrecruiteralpha.models.User;
import com.example.jrecruiteralpha.payload.response.MessageResponse;
import com.example.jrecruiteralpha.repositories.UserRepository;
import com.example.jrecruiteralpha.security.JwtUtils;
import com.example.jrecruiteralpha.services.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/profile")
public class UserProfileController
{
    private final Logger logger = LoggerFactory.getLogger(UserProfileController.class);
    private final FileService fileService;
    private final UserRepository userRepository;
    private final JwtUtils jwtUtils;

    public UserProfileController(FileService fileService,UserRepository userRepository,JwtUtils jwtUtils)
    {
        this.fileService = fileService;
        this.userRepository = userRepository;
        this.jwtUtils = jwtUtils;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestParam("file") MultipartFile file, String token) throws Exception
    {
        if(token==null)
        {
            return ResponseEntity.ok(new MessageResponse("Musisz być zalogowany do tej operacji!"));
        }
        else
        {
            logger.info("User: "+jwtUtils.getUserNameFromJwtToken(token));
            Optional<User> optionalUser = userRepository.findByUsername(jwtUtils.getUserNameFromJwtToken(token));
            if(file.isEmpty() || !optionalUser.isPresent())
            {
                logger.error("Send file is empty or user is not present!");
                throw new Exception("Send file is empty or user is not present!");
            }
            else
            {
                try
                {
                    fileService.uploadFile(file);
                }
                finally
                {
                    User user = optionalUser.get();
                    user.setCvPath(file.getOriginalFilename());
                    userRepository.save(user);
                    logger.info("Nazwa pliku: "+user.getCvPath());
                }
                return ResponseEntity.ok(new MessageResponse("Pomyślnie przesłano plik z twoim CV"));
            }
        }
    }
}
