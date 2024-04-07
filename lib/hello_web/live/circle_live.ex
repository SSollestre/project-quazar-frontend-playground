defmodule HelloWeb.CircleLive do
  use HelloWeb, :live_view

  def mount(_params, _session, socket) do
    initial_y = 100
    json_y = %{y: initial_y}
    {:ok, assign(socket, :circle_y, json_y)}
  end

  def handle_event("move_up", _value, socket) do
    {:noreply, update(socket, :circle_y, fn %{y: current_y} -> %{y: current_y - 10} end)}
  end
end
