import { Schema, model } from "mongoose";
import IDbDesign, { Edge, Node, NodeData, Viewport } from "../../domain/DbDesignInterface";

// Edge Schema
const edgeSchema = new Schema<Edge>({
    animated: { type: Boolean, required: true },
    id: { type: String, required: true },
    source: { type: String, required: true },
    sourceHandle: { type: String, required: true },
    style: { type: Object, required: true },
    target: { type: String, required: true },
    targetHandle: { type: String, required: true }
});

// NodeData Schema
const nodeDataSchema = new Schema<NodeData>({
    collectionName: { type: String },
    fields: { type: Array, default: [] },
    data: { type: Object }
});

// Node Schema
const nodeSchema = new Schema<Node>({
    data: { type: nodeDataSchema, required: true },
    dragging: { type: Boolean, required: true },
    id: { type: String, required: true },
    measured: {
        type: new Schema({
            width: { type: Number, required: true },
            height: { type: Number, required: true }
        }),
        required: true
    },
    position: {
        type: new Schema({
            x: { type: Number, required: true },
            y: { type: Number, required: true }
        }),
        required: true
    },
    selected: { type: Boolean, required: true },
    type: { type: String, required: true }
});

// Viewport Schema
const viewportSchema = new Schema<Viewport>({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    zoom: { type: Number, required: true }
});

// Main DbDesign Collection Schema
const dbDesigncollectionSchema = new Schema<IDbDesign>({
    projectId: { type: String, required: true },
    nodes: { type: [nodeSchema], default: [] },
    edges: { type: [edgeSchema], default: [] },
    viewport: { type: viewportSchema, required: true }
});

// Export the model
const DbDesignModal = model<IDbDesign>('DbDesignCollection', dbDesigncollectionSchema);

export default DbDesignModal;
