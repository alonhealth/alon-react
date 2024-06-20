import AlonIOS

@objc(AlonReact)
class AlonReact: NSObject {
  let healthKitManager = HealthKitManager()

  @objc(requestAuthorization:withRejecter:)
    func requestAuthorization(resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        healthKitManager.requestAuthorization { success, error in
            guard error == nil else {
                reject("AUTH_ERROR", error!.localizedDescription, error)
                return
            }
            resolve(success)
        }
    }

  @objc(fetchStepsData:withEndDate:withResolver:withRejecter:)
    func fetchStepsData(startDate: NSNumber, endDate: NSNumber, resolve: @escaping RCTPromiseResolveBlock, reject: @escaping RCTPromiseRejectBlock) {
        let start = Date(timeIntervalSince1970: startDate.doubleValue / 1000)
        let end = Date(timeIntervalSince1970: endDate.doubleValue / 1000)

        healthKitManager.fetchStepsData(startDate: start, endDate: end) { steps, error in
            if let error = error {
                reject("FETCH_ERROR", error.localizedDescription, error)
            } else {
                resolve(steps)
            }
        }
    }
}
