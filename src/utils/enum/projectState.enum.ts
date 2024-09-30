import { registerEnumType } from '@nestjs/graphql';

export enum ProjectState {
  planning = 'planning',
  demolition = 'demolition',
  renovation = 'renovation',
  finishing = 'finishing',
  qualityControl = 'qualityControl',
  handover = 'handover',
}

export const ProjectStateOrder = [
  ProjectState.planning,
  ProjectState.demolition,
  ProjectState.renovation,
  ProjectState.finishing,
  ProjectState.qualityControl,
  ProjectState.handover,
];

registerEnumType(ProjectState, {
  name: 'ProjectState',
});
