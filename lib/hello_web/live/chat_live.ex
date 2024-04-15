defmodule HelloWeb.ChatLive do
  use HelloWeb, :live_view

  def mount(_params, _session, socket) do
    {:ok, socket}
  end

  def handle_event("greet", %{"channelSocket" => cSocket}, socket) do
    # IO.puts("Channel built")
    # IO.inspect(cSocket)
    {:noreply, socket}
  end
end
