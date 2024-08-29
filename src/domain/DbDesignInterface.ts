import { Document, Schema } from "mongoose";

export interface Edge {
    animated: boolean;
    id: string;
    source: string;
    sourceHandle: string;
    style: { stroke: string };
    target: string;
    targetHandle: string;
}

export interface NodeData {
    collectionName?: string;
    fields?: any[];
    data?: any;
}

export interface Node {
    data: NodeData;
    dragging: boolean;
    id: string;
    measured: { width: number; height: number };
    position: { x: number; y: number };
    selected: boolean;
    type: string;
}

export interface Viewport {
    x: number;
    y: number;
    zoom: number;
}

interface IDbDesign extends Document {
    projectId: string;
    nodes: Node[];
    edges: Edge[];
    viewport: Viewport;
}

export default IDbDesign;
