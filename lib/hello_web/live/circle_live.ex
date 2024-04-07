defmodule HelloWeb.CircleLive do
  use HelloWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, assign(socket, :circle_y, 100)}
  end

  def handle_event("move_up", value, socket) do
    IO.inspect(value)
    {:noreply, update(socket, :circle_y, &(&1 - 10))}
  end
end
