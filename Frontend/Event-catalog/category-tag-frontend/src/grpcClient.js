import { CategoryTagServiceClient } from './proto/category_tag_grpc_web_pb';
import { CategoryRequest, TagRequest, Empty } from './proto/category_tag_pb';

const client = new CategoryTagServiceClient('http://localhost:3022', null, null);


export function createCategory(name, description, callback) {
  const request = new CategoryRequest();
  request.setName(name);
  request.setDescription(description);

  client.createCategory(request, {}, (err, response) => {
    callback(err, response);
  });
}


export function listCategories(callback) {
  const request = new Empty();
  client.listCategories(request, {}, (err, response) => {
    callback(err, response);
  });
}


export function createTag(name, callback) {
  const request = new TagRequest();
  request.setName(name);

  client.createTag(request, {}, (err, response) => {
    callback(err, response);
  });
}

export function listTags(callback) {
  const request = new Empty();
  client.listTags(request, {}, (err, response) => {
    callback(err, response);
  });
}
