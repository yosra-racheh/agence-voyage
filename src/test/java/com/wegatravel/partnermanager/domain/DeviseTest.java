package com.wegatravel.partnermanager.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.wegatravel.partnermanager.web.rest.TestUtil;

public class DeviseTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Devise.class);
        Devise devise1 = new Devise();
        devise1.setId(1L);
        Devise devise2 = new Devise();
        devise2.setId(devise1.getId());
        assertThat(devise1).isEqualTo(devise2);
        devise2.setId(2L);
        assertThat(devise1).isNotEqualTo(devise2);
        devise1.setId(null);
        assertThat(devise1).isNotEqualTo(devise2);
    }
}
