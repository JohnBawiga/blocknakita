package nstpcapstone1.sims.Controller;

import nstpcapstone1.sims.Entity.AnnouncementEntity;
import nstpcapstone1.sims.Service.AnnouncementService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin(origins="*")
@RequestMapping("/announcements")
public class AnnouncementController {

    private final AnnouncementService announcementService;

    @Autowired
    public AnnouncementController(AnnouncementService announcementService) {
        this.announcementService = announcementService;
    }

	    

    // Read operation
    @GetMapping("getann/{announcementID}")
    public ResponseEntity<AnnouncementEntity> getAnnouncementById(@PathVariable Long announcementID) {
        AnnouncementEntity announcement = announcementService.getAnnouncementById(announcementID);
        return ResponseEntity.ok(announcement);
    }

    // Update operation
    @PutMapping("/updateann/{announcementID}")
    public ResponseEntity<AnnouncementEntity> updateAnnouncement(@PathVariable Long announcementID, @RequestBody AnnouncementEntity updatedAnnouncement) {
        AnnouncementEntity existingAnnouncement = announcementService.getAnnouncementById(announcementID);

        if (existingAnnouncement == null) {
            return ResponseEntity.notFound().build();
        }

        // Update the existing announcement with the new details
        existingAnnouncement.setTitle(updatedAnnouncement.getTitle());
        existingAnnouncement.setDescription(updatedAnnouncement.getDescription());
        existingAnnouncement.setDate(updatedAnnouncement.getDate());
        existingAnnouncement.setImage(updatedAnnouncement.getImage());
        existingAnnouncement.setAdminID(updatedAnnouncement.getAdminID());

        // Save the updated announcement
        AnnouncementEntity savedAnnouncement = announcementService.saveAnnouncement(existingAnnouncement);
        
        return ResponseEntity.ok(savedAnnouncement);
    }
   

    // Delete operation
    @DeleteMapping("deleteann/{announcementID}")
    public ResponseEntity<Void> deleteAnnouncement(@PathVariable Long announcementID) {
        announcementService.deleteAnnouncement(announcementID);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Get all announcements
    @GetMapping("getall")
    
    public ResponseEntity<List<AnnouncementEntity>> getAllAnnouncements() {
        List<AnnouncementEntity> announcements = announcementService.getAllAnnouncements();
        return ResponseEntity.ok(announcements);
    }
    
    @PostMapping("createann")
    public ResponseEntity<Object> createAnnouncement(
            @RequestParam("title") String title,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("adminID") Long adminID) throws IOException {

        // Check for missing parameters or validation errors
        if (title == null || description == null || adminID == null) {
            return new ResponseEntity<>("Title, description, and adminID are required", HttpStatus.BAD_REQUEST);
        }

        // Handle image
        if (image == null || image.isEmpty()) {
            return new ResponseEntity<>("Image is required", HttpStatus.BAD_REQUEST);
        }

        String contentType = image.getContentType();
        if (!contentType.equals("image/png") && !contentType.equals("image/jpeg")) {
            return new ResponseEntity<>("Only PNG and JPG images are supported", HttpStatus.BAD_REQUEST);
        }

        // Create AnnouncementEntity object
        AnnouncementEntity newAnnouncement = new AnnouncementEntity();
        newAnnouncement.setTitle(title);
        newAnnouncement.setDescription(description);
        newAnnouncement.setImage(image.getBytes());
        newAnnouncement.setAdminID(adminID);

        // Save the announcement
        AnnouncementEntity createdAnnouncement = announcementService.createAnnouncement(newAnnouncement);

        return new ResponseEntity<>("Announcement created successfully", HttpStatus.CREATED);
    }


    
}
