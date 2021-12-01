package com.omega.json;

public class Point
{

  private final Decimal x;
  private final Decimal y;

  private Point(double x, double y)
  {
    this.x = Decimal.create(x, 7);
    this.y = Decimal.create(y, 7);
  }

  public static Point create(double x, double y)
  {
    return new Point(x, y);
  }

  @Override
  public String toString()
  {
    return String.format("[%s,%s]", x, y);
  }
}
