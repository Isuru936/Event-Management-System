package ovin.LMS.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ovin.LMS.dto.EventDto;
import ovin.LMS.entity.Event;
import ovin.LMS.mapper.EventMapper;
import ovin.LMS.service.EventService;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/events")
public class EventController {

    private final EventService eventService;

    @Autowired
    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping
    public ResponseEntity<List<EventDto>> getAllEvents() {
        List<Event> events = eventService.getAllEvents();
        List<EventDto> eventDtos = events.stream()
                .map(EventMapper::mapToEventDto)
                .collect(Collectors.toList());
        return ResponseEntity.ok(eventDtos);
    }

    @PostMapping
    public ResponseEntity<EventDto> createEvent(@RequestBody EventDto eventDto) {
        Event event = EventMapper.mapToEvent(eventDto);
        Event createdEvent = eventService.createEvent(event);
        EventDto createdEventDto = EventMapper.mapToEventDto(createdEvent);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEventDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateEvent(@PathVariable Long id, @RequestBody EventDto eventDto) {
        Event existingEvent = eventService.getEventById(id);
        if (existingEvent == null) {
            return ResponseEntity.notFound().build();
        }
        Event updatedEvent = EventMapper.mapToEvent(eventDto);
        updatedEvent.setId(id);
        updatedEvent = eventService.updateEvent(updatedEvent);
        EventDto updatedEventDto = EventMapper.mapToEventDto(updatedEvent);
        return ResponseEntity.ok(updatedEventDto);
    }
}
