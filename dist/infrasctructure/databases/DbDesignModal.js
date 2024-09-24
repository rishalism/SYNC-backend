"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Edge Schema
const edgeSchema = new mongoose_1.Schema({
    animated: { type: Boolean, required: true },
    id: { type: String, required: true },
    source: { type: String, required: true },
    sourceHandle: { type: String, required: true },
    style: { type: Object, required: true },
    target: { type: String, required: true },
    targetHandle: { type: String, required: true }
});
// NodeData Schema
const nodeDataSchema = new mongoose_1.Schema({
    collectionName: { type: String },
    fields: { type: Array, default: [] },
    data: { type: Object }
});
// Node Schema
const nodeSchema = new mongoose_1.Schema({
    data: { type: nodeDataSchema, required: true },
    dragging: { type: Boolean, required: true },
    id: { type: String, required: true },
    measured: {
        type: new mongoose_1.Schema({
            width: { type: Number, required: true },
            height: { type: Number, required: true }
        }),
        required: true
    },
    position: {
        type: new mongoose_1.Schema({
            x: { type: Number, required: true },
            y: { type: Number, required: true }
        }),
        required: true
    },
    selected: { type: Boolean, required: true },
    type: { type: String, required: true }
});
// Viewport Schema
const viewportSchema = new mongoose_1.Schema({
    x: { type: Number, required: true },
    y: { type: Number, required: true },
    zoom: { type: Number, required: true }
});
// Main DbDesign Collection Schema
const dbDesigncollectionSchema = new mongoose_1.Schema({
    projectId: { type: String, required: true },
    nodes: { type: [nodeSchema], default: [] },
    edges: { type: [edgeSchema], default: [] },
    viewport: { type: viewportSchema, required: true }
});
// Export the model
const DbDesignModal = (0, mongoose_1.model)('DbDesignCollection', dbDesigncollectionSchema);
exports.default = DbDesignModal;
