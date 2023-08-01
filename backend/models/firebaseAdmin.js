import admin from 'firebase-admin';
import {initializeApp} from 'firebase-admin/app';

const serviceAccount={
  "type": "service_account",
  "project_id": "health-2df11",
  "private_key_id":process.env.FIRE_ADMIN_KEY,
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC6bQFgBZP6d5xo\nOu/iTTyPKWk6G06oFYut4sC/ZyZXfq9AC5wwzRxslo5fCNltVShug6Dquk4j360m\nxYgwpMgFFRhpjWGeqhGchtyH1ZpWixu294gXUwSUXu1HWKJHiNC6Na4K2a4biD1a\nPuQ93GzgkXrBYxGcBCkWi5f18jhYU2Qc3zfofuir2GrfrEUR+m7HFNQhEdVolr6n\nLFcsCs08BLKWUgMRvxrF9DCZrqg9kK/+KLToh/ifrj6AVheKiZJK1y88a9oSkuAE\nl+vzFOQ9Ej7i1PJGKJhdGS8XCM602KkHB+QoT27JYtwPoMcbRpiKkbtezPntUZoA\nc16jdZa7AgMBAAECggEAUx4RnGGwSd41XmVUmbWs9/lTIKSXK6q7hZIRNOVE+4KQ\nmUHz5/AzKZjwrh9wbWYn6ioGv1DEUQtDlINChsmZImb25Oyzpv2Vb4/TWD6cmtRX\nzXpMc3XAl3RBX2t9ot41jagsSksmbMEP9aIPuiMCaheCvyEv8zsJpLMlU/MkOwBk\nVzO3p1A5lo202ztn4MC0QKlH/klEZMjVtOhkpIhqFsTTxBVnWohC9yhXJMO5PP6d\nTmK+FxTehCkBYyvBq1oGVESCr0MMkTOsTLat6MFlWnX49gMBj7xmSYzliZ8p2cvM\nkXzarDcI4/p7oqJ3U6qNoIhP3sVOywaigJmIAblhhQKBgQDayTJCa8RYtTcRtky2\nMvWN6lmKh3YZbyKyky2iltVHLyDMMLAPDDJadfB/F8sjrdOgLwsTQQLYhFZwbi5g\nklE7MZEDdnKzcSoQV5R9L/hVd5hd7YqM1HQcHlJxTYYGpSIxK1hDXo4NjX9OTS8j\n56SlREhIBkpvtQixw/eY4OtwHwKBgQDaIri0ZkL0TuXC797pNi4LDIdGXLX5A4W7\nXN2vCIHFnJ2B2nnRgLk5NKeYvQPuHGpJeKr38PmSFPpMxCFfeoU5IxITroxFjRyg\nqNJCSl6qOMIo8OAOQRWtpWZe99a12NgPYt+HZ/XS6U1GaB5hJRlFmV7fa3EETiYw\nvPVfp2BV5QKBgAqfZi9PaDMeaVQU09is1LtVO4+8UAGgIcEl4Dtas3RHV4JSgtnY\nL8GwpEKndxd+Yx4N6q2+pFK66i9/SgUqVYNYPsA6SgtoXTB58B277ITJz74PwIBh\n+Fk9J6eUqgM8lVJp1lk/CAqkah/1I2rM3nOfwxqsI4UU9x0adLUZhpTlAoGAbViC\nZkvsvDLgkftULmtuYTOCjA7lWVIes3E13wvQoZKEkhdGgXKZZseyS6pUUgQEc5f9\nfBRbxpKldd3LLOVp6t5drWgOAL9f3llCLODC22lgSs2UQxD1IPqMeoaaJsXwaKYT\njvjaDUPN7ME8mU3TgUQEftKI8LOMCVpvVee9LtECgYEAl5AdmwweJLO2Tj9aaoan\nMdpEE6G4fkGtp8ISF+kj6WSkNqp4BBC2O6btgpvPprXVIovy4JaepPI/qvB0VZrs\nP0GPvIYsK4X0L+wwCPXwmKkDieL7+4Raga2Clgz3fs8PCxAYbsbbjPX+86ntGL9N\nlX7hrBLlK2OpOBDAL4MMrow=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-wfsvz@health-2df11.iam.gserviceaccount.com",
  "client_id": "104328701518804215618",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-wfsvz%40health-2df11.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}


const app=initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export default app




