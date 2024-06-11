package ovin.LMS.mapper;

import ovin.LMS.dto.EventDto;
import ovin.LMS.entity.Event;

import java.time.LocalDateTime;

public class EventMapper {

    public static Event mapToEvent(EventDto eventDto) {
        Event event = new Event();
        event.setName(eventDto.getName());
        event.setDescription(eventDto.getDescription());
        if (eventDto.getDateTime() != null) {
            event.setDateTime(LocalDateTime.parse(eventDto.getDateTime())); // Map dateTime field
        }
        return event;
    }

    public static EventDto mapToEventDto(Event event) {
        EventDto eventDto = new EventDto();
        eventDto.setId(event.getId());
        eventDto.setName(event.getName());
        eventDto.setDescription(event.getDescription());
        if (event.getDateTime() != null) {
            eventDto.setDateTime(String.valueOf(event.getDateTime())); // Map dateTime field
        }
        return eventDto;
    }
}
