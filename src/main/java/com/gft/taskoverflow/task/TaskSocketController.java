package com.gft.taskoverflow.task;

import com.gft.taskoverflow.task.dto.TaskCreationDto;
import com.gft.taskoverflow.task.dto.TaskMoveDto;
import com.gft.taskoverflow.task.dto.TaskPreviewDto;
import jakarta.validation.Valid;
import lombok.Data;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
@Data
public class TaskSocketController {
    private final TaskService taskService;

    @MessageMapping("/task-add/{boardId}")
    @SendTo("/topic/task-added/{boardId}")
    public TaskPreviewDto addTask(@DestinationVariable Long boardId, @Valid @Payload TaskCreationDto task) {
        return taskService.addTask(task, task.taskListId(), boardId);
    }

    @MessageMapping("/task-delete/{boardId}")
    @SendTo("/topic/task-deleted/{boardId}")
    public Long deleteTask(@DestinationVariable Long boardId, @Payload Long taskId) {
        taskService.deleteTask(taskId);
        return taskId;
    }

    @MessageMapping("/task-move/{boardId}")
    public void moveTask(@DestinationVariable Long boardId, @Payload TaskMoveDto taskMoveDto) {
        taskService.moveTaskToAnotherList(taskMoveDto);
    }
}
