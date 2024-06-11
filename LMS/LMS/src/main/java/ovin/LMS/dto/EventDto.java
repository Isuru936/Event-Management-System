package ovin.LMS.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class EventDto {
    // Getters and Setters
    private Long id; // Add id field
    private String name;
    private String description;
    private String dateTime; // New field for dateTime

    // Constructors
    public EventDto() {
    }

    public EventDto(Long id, String name, String description, String dateTime) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.dateTime = dateTime; // Initialize dateTime
    }

    // toString() method
    @Override
    public String toString() {
        return "EventDto{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", description='" + description + '\'' +
                ", dateTime='" + dateTime + '\'' +
                '}';
    }
}
