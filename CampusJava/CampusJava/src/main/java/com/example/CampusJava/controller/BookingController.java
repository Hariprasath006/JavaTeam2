package com.example.CampusJava.controller;

import com.example.CampusJava.model.Booking;
import com.example.CampusJava.repository.BookingRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingRepository repo;

    public BookingController(BookingRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return repo.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createBooking(@RequestBody Booking booking) {

        boolean conflict = repo.existsByResourceIdAndBookingDateAndTimeSlot(
                booking.getResourceId(),
                booking.getBookingDate(),
                booking.getTimeSlot()
        );

        if (conflict) {
            return ResponseEntity.badRequest()
                    .body("Resource already booked ❌");
        }

        return ResponseEntity.ok(repo.save(booking));
    }

    @PutMapping("/{id}/status")
    public Booking updateStatus(@PathVariable UUID id, @RequestParam String status) {

        Booking booking = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking Not Found"));

        booking.setStatus(status);

        return repo.save(booking);
    }
}
