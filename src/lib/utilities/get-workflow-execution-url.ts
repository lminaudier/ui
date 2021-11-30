import type { WorkflowExecution } from '$lib/models/workflow-execution';

import type { URLSearchParamLike } from './url-search-params';
import { mergeSearchParams, toSearchParams } from './url-search-params';

type WorkflowIdentifier = Pick<WorkflowExecution, 'id' | 'runId'>;

export const getWorkflowExecutionUrl = (
  namespace: string,
  workflow: WorkflowIdentifier,
  query?: URLSearchParamLike,
  queryOverrides?: URLSearchParamLike,
): string => {
  if (!workflow) return;
  const url = `/namespaces/${namespace}/workflows/${workflow.id}/${workflow.runId}`;

  const search = queryOverrides
    ? mergeSearchParams(toSearchParams(query), toSearchParams(queryOverrides))
    : toSearchParams(query);

  return query ? `${url}?${search}` : `${url}`;
};
