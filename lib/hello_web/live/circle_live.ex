defmodule HelloWeb.CircleLive do
  use HelloWeb, :live_view

  def mount(_params, _session, socket) do
    initial_x = 100
    initial_y = 100
    json_pos = %{x: initial_x, y: initial_y}
    {:ok, assign(socket, :circle_pos, json_pos)}
  end

  def handle_event("start_move", %{"key" => key}, socket) do
    IO.inspect("#{key} pressed")

    new_pos =
      case key do
        # Move up
        "w" -> %{x: socket.assigns.circle_pos.x, y: socket.assigns.circle_pos.y - 10}
        # Move left
        "a" -> %{x: socket.assigns.circle_pos.x - 10, y: socket.assigns.circle_pos.y}
        # Move down
        "s" -> %{x: socket.assigns.circle_pos.x, y: socket.assigns.circle_pos.y + 10}
        # Move right
        "d" -> %{x: socket.assigns.circle_pos.x + 10, y: socket.assigns.circle_pos.y}
        _ -> socket.assigns.circle_pos
      end

    {:noreply, assign(socket, :circle_pos, new_pos)}
  end

  def handle_event("stop_move", %{"key" => key}, socket) do
    IO.inspect("#{key} released")
    {:noreply, socket}
  end

  def handle_event("shoot", _value, socket) do
    IO.inspect("Pew")
    {:noreply, socket}
  end
end
