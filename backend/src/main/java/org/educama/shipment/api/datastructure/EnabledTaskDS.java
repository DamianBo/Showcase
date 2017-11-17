package org.educama.shipment.api.datastructure;

/**
 * Re-usable data structure used by resources.
 */
public class EnabledTaskDS {
    public String description;
    public String id;
    public String name;
    public String type;
    public String trackingId;

    public EnabledTaskDS(String description, String id, String name, String type, String trackingId) {
        super();
        this.description = description;
        this.id = id;
        this.name = name;
        this.type = type;
        this.trackingId = trackingId;
    }
}
