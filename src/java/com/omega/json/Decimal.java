package com.omega.json;

public class Decimal
{

  private final double value;
  private final int degree;

  private Decimal(double value, int degree)
  {
    this.value = value;
    this.degree = degree;
  }

  public static Decimal create(double value, int degree)
  {
    return new Decimal(value, degree);
  }

  @Override
  public String toString()
  {
    return String.format("%." + degree + "f", value).replaceAll(",", ".");
  }
}
