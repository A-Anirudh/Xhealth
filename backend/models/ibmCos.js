import * as ibm from 'ibm-cos-sdk'
import * as util from 'util'

var config={
    endpoint:"https://control.cloud-object-storage.cloud.ibm.com/v2/endpoints",
    apiKeyId:"9OzbfELFWLTsjH81rWdXImz6yIw_FCWAuGybPMM7UqeB",
    serviceInstanceId: "crn:v1:bluemix:public:cloud-object-storage:global:a/dbad7cc0c6a642f892afdcb81fac6df4:ba22e8bc-8812-430f-86d5-c7870a03f41c::"
}

var cos = new ibm.S3(config);

