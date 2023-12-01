Steps to run:

1. Inside the backend folder create two files `.env` and `google_credentials.json`.
2. Inside the `.env` file copy paste the following:
   >PORT=4000
    MONGODB_URI=mongodb+srv://bxappliancesdev:appliancesbx2000@bxwebsite.hkliye0.mongodb.net/database?retryWrites=true&w=majority
    JWTSECRET=supersecuresecret
3. Inside the `google_credentials.json` file copy paste the following:
    >{
    "type": "service_account",
    "project_id": "bx-appliances-website",
    "private_key_id": "96f1b64d810b0eea3531cc2b004f369470214eaf",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC+7KR/VF4r2/ah\n+BB7kcPaFhyZ4iKPkSPTJ6izWmOwyTe/jm+qlq3FW6p6TgdBM9NW8ey4vUWvLlGq\nR306831To9RsDiMMbFlYIMm2n5lNXl2j7mAhwuQhx5g1jCFnwUDh0mLrRz8zkd4g\nXZeGtCu6nI7jbqvc3JFPl0DV3XCRzEPje0KAiuYUzBLRz2u0OXkRprmEbycFuVq8\n2rg7/LC9pCUPWVAOTMILovbTM5m8qdtXAgbVvwdL0BsXCTQtzNcQl5V5lrXyDHHN\nYiyXeqNd+662VC/PCiOwUKm2jGb5bT8biBEjVvoCoDfx1h7d2tEDFFubmMjmAeLk\nfVKyimunAgMBAAECggEAC5AHUlLItT1IDX0ZenJUeyO1rbgdQbaXhdU0CVCjEvTM\ntIQqzRj9AyPPCkMpe1BpLy3NmU6VJsvWVEqqEeTnJSaZ2cVtZ/Yz3vt1W+MEhMP/\nRctM9R55dHZDCJMo/sCcblCwfvE8qaHe4vToFVdaAp4ypSFxtRmCj2Boo8saYynx\n9LWAeTNGSmKDDg0at5qJilzgI4N8OtGba5U5pHTPhJLWq8leOW9vvWDCuVWWVzgJ\n8QUmyA8V0s6iwxTRqjjg6dzfSn55KDega7K79e90S2fb9xk8XskodwH/Pe9geEgq\nnPEHnfwHnrNAt3BFMnIj5n6hXAoeiBSiSS5EEMf3wQKBgQDjUrutnbACYI7P/t9F\n/h/SNm3qJ8fREuUsuO1SEmU3jPBQI8VtQNCy1XZmvv8kRmq0q/8V16xTKteFW3zT\nqAUMONK64i9blod8qfz2AdYXEFb65UYH0P6sjFTcwg+hGqmZAdeVskJqEXo9rdGZ\nl8GXCCqXKWf/Y+l3eRq7X25RRwKBgQDXAm6fWrZJUDZ1zps3Ri0vmj5jnz3lHmBz\nmTPyiOSucT5tGX/C4060aGMfhUDMnR2Zy+aCfZkQf+KeQ8ySHs23s/w/1SUy1srm\nFr5PPquQT7KLw9HiErcVWRoI8b0NnbUUIVLK1xPQVI0FgjJGRpfAvnFKf4Lb0DGu\nD07nG6NCoQKBgG9ZiUED6sFfVtUffXKlhiTMMI7wKXqKDOQZOXZoOFg7m0NGImDf\nzNqsoTC3Afdc3svdLDggyvJ6G9Pg+oYa2U4hT2fnf1cXpwozogtG3v2xLUn8oI8X\nmogevTrdfBZoHwcp1dYn2Uxnfz9TM0ZPBa7bezFMQPrij+vL0IJTvo/lAoGATj+x\nWMdfreDGYSt266/bhAaDjCgJE5hxi8CG2k6dwyqtiHEOQTQOkbOn13Hcelr3yeAe\nHQFuskWIiQatrcQOJDwZonWE2zK2lvRSAG8TayrGFP2IJdmfzeIminjHz+vEWfYi\ntnV93YTX6dhPSaopUlk8y9sKGct0OR+THKK/UOECgYEAyHia6lHbNivgyiykDZJQ\nc7Zo7pcrnlGOzlCe2zqEe2s/xl1vO7JbvqFiFrJjv4zUHz/o4gYCKaeQVEAyAMKD\nD/2kq/e12zGaErJdiUUf+/XWMocX74fQczp8L2G56WImx9T8H6dj+m0n0Aj0zcYL\nsCa3ziPKy6NfR6U5oDaAPuw=\n-----END PRIVATE KEY-----\n",
    "client_email": "bx-appliancess@bx-appliances-website.iam.gserviceaccount.com",
    "client_id": "103053034538566473527",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/bx-appliancess%40bx-appliances-website.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  }
4. Run the `run.bat` batch file.