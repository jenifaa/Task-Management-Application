import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";

const TaskBoard = ({ task }) => {
// {name,email} = task;

  const onDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const { source, destination } = result;

    // Find the dragged task
    const draggedTask = taskData[source.index];

    // Update the category based on the new column
    draggedTask.category = destination.droppableId;

    // Move the task in the state
    const newTasks = Array.from(taskData);
    newTasks.splice(source.index, 1); // Remove from old position
    newTasks.splice(destination.index, 0, draggedTask); // Insert in new position

    setTaskData(newTasks);
    updateTaskCategory(draggedTask._id, destination.droppableId); // Update in DB
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {["To Do", "In Progress", "Completed"].map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/3 p-4 bg-gray-200 rounded-lg"
              >
                <h2 className="text-lg font-bold mb-4">{category}</h2>
                {taskData
                  .filter((task) => task.category === category)
                  .map((task, index) => (
                    <Draggable key={task._id} draggableId={task._id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="p-4 mb-2 bg-white shadow-md rounded-md"
                        >
                          {task.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default TaskBoard;
