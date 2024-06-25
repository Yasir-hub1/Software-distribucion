<form action="/send-email" method="POST">
    @csrf
    <label for="message">Mensaje:</label>
    <textarea name="message" id="message" required></textarea>
    <button type="submit">Enviar correo</button>
</form>
