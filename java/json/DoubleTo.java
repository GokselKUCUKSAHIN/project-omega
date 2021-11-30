package com.omega.json;

public class DoubleTo
{
  // Double To String DTS

  public static String string(double number, int degree)
  {
    return String.format("%." + degree + "f", number).replaceAll(",", ".");
  }
}
