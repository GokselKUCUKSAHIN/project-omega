package com.omega.Service;


import com.squareup.okhttp.*;

import java.io.IOException;

public class PostResult
{

  private static final OkHttpClient client = new OkHttpClient();

  public static String send(String URL, String jsonBody) throws IOException
  {
    RequestBody body = RequestBody.create(MediaType.parse("application/json"), jsonBody);
    Request request = new Request.Builder().url(URL).post(body).build();
    Response response = client.newCall(request).execute();
    return response.body().string();
  }

  public static String send(String baseURL, String route, String jsonBody) throws IOException
  {
    return send(String.format("%s/%s", baseURL, route), jsonBody);
  }
}