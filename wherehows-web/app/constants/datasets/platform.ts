import { IBrowserRouteParams } from 'wherehows-web/routes/browse/entity';
import { IReadDatasetsOptionBag } from 'wherehows-web/typings/api/datasets/dataset';
import { getPlatformFromString, isDatasetPlatform, isDatasetPrefix } from 'wherehows-web/utils/validators/platform';

/**
 * The known/supported list of dataset platforms
 * @enum {string}
 */
enum DatasetPlatform {
  Kafka = 'kafka',
  KafkaLc = 'kafka-lc',
  Presto = 'presto',
  Espresso = 'espresso',
  Oracle = 'oracle',
  MySql = 'mysql',
  Teradata = 'teradata',
  HDFS = 'hdfs',
  Ambry = 'ambry',
  Couchbase = 'couchbase',
  Voldemort = 'voldemort',
  Venice = 'venice',
  Vector = 'vector',
  Hive = 'hive',
  FollowFeed = 'followfeed'
}

/**
 * Given a platform and a new node, composes an object of query parameters to be used in the request for
 * platforms or datasets
 * @param {(Pick<IBrowserRouteParams, 'platform'> & { node: string })} { platform, node }
 * @returns {Partial<IReadDatasetsOptionBag>}
 */
const nodeToQueryParams = ({
  platform,
  node
}: Pick<IBrowserRouteParams, 'platform'> & { node: string }): Partial<IReadDatasetsOptionBag> => {
  const queryParams = {};

  if (isDatasetPrefix(node)) {
    Object.assign(queryParams, { prefix: node.replace(/\//g, '') });
  }

  // If the node is a platform, assign that value to the query params object
  if (isDatasetPlatform(node)) {
    Object.assign(queryParams, { platform: getPlatformFromString(node) });
  }

  // If a platform value is already present override the previously set value
  // there should not be a 'future' platform value if one already exists
  if (platform) {
    Object.assign(queryParams, { platform });
  }

  return queryParams;
};

export { DatasetPlatform, nodeToQueryParams };
