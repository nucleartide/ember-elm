port module Chat exposing (main)

import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (..)
import WebSocket as WS

main =
  Html.programWithFlags {
    init = init,
    view = view,
    update = update,
    subscriptions = subscriptions
  }

--
-- Model.
--

type alias Model = {
  server: String,
  input: String,
  messages: List String
}

init : String -> (Model, Cmd Msg)
init server =
  (Model server "" [], Cmd.none)

--
-- Update.
--

type Msg
  = Input String
  | Send
  | NewEmoji String
  | NewMessage String

update : Msg -> Model -> (Model, Cmd msg)
update msg ({ server, input, messages } as model) =
  case msg of
    Input newInput ->
      ({ model | input = newInput }, Cmd.none)
    Send ->
      ({ model | input = "" }, WS.send server input)
    NewEmoji emoji ->
      ({ model | input = input ++ emoji }, Cmd.none)
    NewMessage newMessage ->
      ({ model | messages = newMessage :: messages }, Cmd.none)

--
-- Subscriptions.
--

port emoji : (String -> msg) -> Sub msg

subscriptions : Model -> Sub Msg
subscriptions { server } =
  Sub.batch [WS.listen server NewMessage, emoji NewEmoji]

--
-- View.
--

view : Model -> Html Msg
view model =
  div [class "chat-container"] [
    input [class "chat-message-input", onInput Input, value model.input] [],
    button [onClick Send] [text "Send"],
    div [class "chat-messages"] (List.map viewMessage (List.reverse model.messages))
  ]

viewMessage : String -> Html msg
viewMessage msg =
  div [] [text msg]
