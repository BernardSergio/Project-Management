package org.sergio.project_management.enums;

public enum Status {
    IN_PROGRESS("In Progress"),
    NOT_STARTED("Not Started"),
    COMPLETED("Completed");

    private final String label;

    Status(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
