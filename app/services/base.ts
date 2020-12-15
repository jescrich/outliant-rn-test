export default class BaseService {
  protected static checkForErrors(response: any) {
    if (response && response.error) {
      if (response.message) {
        throw response.message;
      } else {
        throw Error('Error trying to call the service.');
      }
    }
  }

  protected static getUrl(uri: string) {
    return '';
  }
}
